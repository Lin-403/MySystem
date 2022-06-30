

import PublishTable from '../../../components/publish-manage/PublishTable';
import usePublish from '../../../components/publish-manage/usePublish';

export default function Published() {
  var {dataSource,handelPublish}=usePublish(3)
  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <PublishTable handlePublish={(id)=>handelPublish(id)} dataSource={dataSource}  pState={2}/>
    </div>
  )
}
