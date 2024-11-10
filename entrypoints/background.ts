import { go } from 'fuzzysort';

type BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;

interface BookMarksSuggetResult {
  url: string;
  description: string;
  content: string;
}
let bookMarksSuggetResult: BookMarksSuggetResult[] = [];

function convertToHtmlEntities(str: string) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// 此函数将书签的层次结构扁平化为一个对象数组
function flattenBookmarks(flatBookmarks: BookmarkTreeNode) {
  const bookMarksSuggetResult: BookMarksSuggetResult[] = [];

  function traverseBookmarks(node: BookmarkTreeNode, path: string[] = []) {
    if (node.url) {
      // 转换 < > & 为字符实体
      // 如果是书签，则创建一个包含描述的对象并添加到数组中
      bookMarksSuggetResult.push({
        content: node.title,
        description: path.join('/') + '/' + node.title,
        url: node.url,
      });
    } else {
      // 如果是文件夹，则递归遍历其子项
      if (node.children && node.children.length > 0) {
        const len = node.children.length;
        for (let i = 0; i < len; i++) {
          traverseBookmarks(node.children[i], path.concat(node.title));
        }
      }
    }
  }

  // 从根书签开始遍历
  traverseBookmarks(flatBookmarks);

  return bookMarksSuggetResult;
}

async function buildSuggestion() {
  const bookmarks = await chrome.bookmarks.getTree();
  const root: BookmarkTreeNode = Array.isArray(bookmarks) ? bookmarks[0] : bookmarks;
  bookMarksSuggetResult = flattenBookmarks(root);

  // console.log('bookMarksSuggetResult 更新', bookMarksSuggetResult);
  return bookMarksSuggetResult;
}

export default defineBackground({
  type: 'module',
  main() {
    let resultsSuggest: BookMarksSuggetResult[] = [];
    chrome.runtime.onInstalled.addListener(async () => {
      buildSuggestion();
    });

    chrome.omnibox.onInputStarted.addListener(async () => {
      await buildSuggestion();
    });
    chrome.omnibox.onInputChanged.addListener(async (text, suggest) => {
      if (bookMarksSuggetResult && bookMarksSuggetResult.length > 0) {
        const keysResults = go(text, bookMarksSuggetResult, {
          keys: ['description', 'url'],
          limit: 10,
        });
        resultsSuggest = keysResults.map((result) => {
          return result.obj;
        });
        // 提示的建议如果存在 &, <, > 会报错
        // 不能在模糊匹配前进行实体字符转换,需要在匹配后进行实体转换
        suggest(
          keysResults.map((keysResult) => {
            let description = '';
            keysResult.forEach((result, index) => {
              let list = result.highlight((match) => {
                return `<match>${convertToHtmlEntities(match)}</match>`;
              });
              list = list.map((str) => {
                if (!str.startsWith('<match>')) {
                  return convertToHtmlEntities(str);
                }
                return str;
              });
              let str = list.join('');

              if (str === '') {
                if (index === 0) {
                  str = convertToHtmlEntities(keysResult.obj.description);
                }
                if (index === 1) {
                  str = convertToHtmlEntities(keysResult.obj.url);
                }
              }
              if (index === 1) {
                str = `<url>(${str})</url>`;
              }
              description += str;
            });
            // console.log(description, keysResult.obj.content);
            return {
              content: keysResult.obj.content,
              description: description,
            };
          }),
        );
      }
    });

    chrome.omnibox.onInputEntered.addListener((text) => {
      const index = resultsSuggest.findIndex((suggest) => {
        return suggest.content === text;
      });
      chrome.tabs.create({
        url: resultsSuggest[index].url,
      });
    });
  },
});
