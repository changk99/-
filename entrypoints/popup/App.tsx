import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BaseSettings } from './BaseSettings';
import { More } from './More';
function App() {
  return (
    <div className="px-3 py-5">
      <Tabs defaultValue="base-settings" className="w-[400px] min-h-[300px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="base-settings">基础设置</TabsTrigger>
          <TabsTrigger value="more">更多</TabsTrigger>
        </TabsList>
        <TabsContent value="base-settings">
          <BaseSettings className="mt-3"></BaseSettings>
        </TabsContent>
        <TabsContent value="more">
          <More></More>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
