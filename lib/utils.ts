import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageResolution(src: string | File): Promise<{
  width: number;
  height: number;
}> {
  return new Promise((resolve, reject) => {
    // 创建一个新的Image对象
    const img = new Image();
    if (typeof src !== 'string') {
      src = URL.createObjectURL(src);
    }

    // 设置图像源
    img.src = src;

    // 监听图像加载完成事件
    img.onload = function () {
      // 获取图像的宽度和高度
      const width = img.width;
      const height = img.height;

      URL.revokeObjectURL(img.src);
      // 成功解析Promise
      resolve({ width, height });
    };

    // 监听图像加载错误事件
    img.onerror = function () {
      // 拒绝Promise
      reject(new Error('图像加载失败'));
    };
  });
}

export function loadIconImage(file: File, { iconSize = 128 } = {}): Promise<ImageData> {
  return new Promise(async (resolve, reject) => {
    // 创建一个Image对象
    const image = new Image();

    // 设置Image对象的源为文件对象
    image.src = URL.createObjectURL(file);

    // 当图像加载完成后，将其绘制到canvas上
    image.onload = function () {
      // 创建canvas元素
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // 设置canvas的尺寸与图像尺寸相同
      canvas.width = iconSize;
      canvas.height = iconSize;

      const width = image.naturalWidth;
      const height = image.height;

      if (ctx) {
        // 将图像绘制到canvas上
        if (width > height) {
          const r = width / iconSize;
          ctx.drawImage(image, 0, (iconSize - height / r) / 2, iconSize, height / r); // 绘制原始图像
        } else {
          const r = height / iconSize;
          ctx.drawImage(image, (iconSize - width / r) / 2, 0, width / r, iconSize);
        }

        // 获取imageData
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // 这里可以对imageData进行操作，例如处理图像数据

        // 清理：释放创建的URL对象
        URL.revokeObjectURL(image.src);

        // 返回imageData
        resolve(imageData);
      }
    };

    // 处理图像加载失败的情况
    image.onerror = function (err) {
      reject(err);
    };
  });
}
