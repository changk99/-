import { Button } from '@/components/ui/button';
import { loadIconImage } from '@/lib/utils';
import { toast, Toaster } from 'sonner';

function CustomIcon() {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      console.log(selectedFiles);
      try {
        const imageData = await loadIconImage(selectedFiles[0]);
        chrome.action.setIcon({
          imageData,
        });
        toast.success('设置成功', {
          position: 'bottom-right',
        });
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message || '设置失败', {
            position: 'bottom-right',
          });
        }
      }
    }
  };

  function selectIcon() {
    fileRef.current?.click();
  }
  return (
    <div>
      <Button size={'sm'} onClick={selectIcon}>
        自定义扩展图标
      </Button>
      <input
        accept="image/*"
        ref={fileRef}
        onChange={handleFileChange}
        className="sr-only"
        type="file"
      />
      <Toaster className="max-w-[150px] !left-auto !right-0"></Toaster>
    </div>
  );
}

export function BaseSettings(props: React.ButtonHTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <CustomIcon></CustomIcon>
    </div>
  );
}
