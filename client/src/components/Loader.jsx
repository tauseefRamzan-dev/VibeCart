import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

const Loader = () => {
  return (
    <div className='d-flex justify-content-center align-items-center vw-100 vh-100'>
    <Spin  indicator={<LoadingOutlined style={{ fontSize: 48,color: 'black' }} spin />} />
    </div>
  )
}

export default Loader
// vh-100 vw-100