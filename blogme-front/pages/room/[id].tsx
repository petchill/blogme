import { useRouter } from 'next/router'
import { Typography } from 'antd';
import { observer } from 'mobx-react-lite'
import "../../styles/BlogDetail.css"
import HeaderComponent from "../../components/Navbar/Navbar"
import { RoomService } from "../../services/RoomService"
import { useEffect, useState } from 'react'
import { IRoom } from '../../interfaces/IRoom'
import { Input } from 'antd';
import { LikeOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const { Paragraph } = Typography

function RoomDetail(props) {
  const router = useRouter()
  const [viewModel] = useState(new RoomService())
  useEffect(() => {
    viewModel.fetchRoomData()
    console.log(viewModel.roomData)
  }, [])
  const roomId = router.query.id
  return (
    <div className="roomMain">
      <HeaderComponent />
      <div className="roomContainer">
        <h1>
          Room No. {roomId}
        </h1>
        <div className="roomContent">
          <div className="roomContentHeader">
            <h1 className="topicText">
              {viewModel.roomData.topic}
            </h1>
          </div>
          <div className="roomContentDescription">
            {/* <TextArea value={viewModel.roomData.description} disabled={true}>
              {viewModel.roomData.description}
            </TextArea> */}
            <pre className="descriptionText">
              {viewModel.roomData.description}
            </pre>
          </div>

          <div className="content-footer">
            <span>Post by {viewModel.roomData.owner}</span>
            {/* <span>{viewModel.roomData.liked_user}</span> */}
            {/* {viewModel.roomData} */}
          </div>
        </div>
        <div className="room-comment">


        </div>

      </div>
    </div>
  )
}

export async function getInitialProps(context) {
  const { id } = context.query
  console.log("id => ", id)
  return {
    props: {}
  }
}

export default observer(RoomDetail)