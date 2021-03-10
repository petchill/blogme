import { observer } from 'mobx-react-lite'
import { Table, Tag, Space, Tooltip } from 'antd'
const { Column, ColumnGroup } = Table
import "../../styles/Blog.css"
import HeaderComponent from "../../components/Navbar/Navbar"

const mockData = [
  {
    _id: 1,
    owner: "owner 1",
    topic: "Topic 1",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    created_at: new Date().toString(),
  },
  {
    _id: 2,
    owner: "owner 2",
    topic: "Topic 2",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    created_at: new Date().toString(),
  }, {
    _id: 3,
    owner: "owner 3",
    topic: "Topic 3",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    created_at: new Date().toString(),
  }, {
    _id: 4,
    owner: "owner 4",
    topic: "Topic 4",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    created_at: new Date().toString(),
  }, {
    _id: 5,
    owner: "owner 5",
    topic: "Topic 5",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    created_at: new Date().toString(),
  },
]

const data = [
  {
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park asdfasdfdsafsdafsadfasdfasdfsdafsadf',
    tags: ['nice', 'developer', 'adadsaddadad', 'adasdfsadfsadf', 'asdfdasfasdf'],
  },
  {

    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

function Blog() {
  return (
    <div className="blogMain">
      <HeaderComponent></HeaderComponent>
      <div className="blogMainContent">
        <span className="contentHeader"> Blog </span>
        <div className="blogSearchWrapper">

        </div>
        <div className="blog">
          <div className="blogTable">
            <Table dataSource={mockData}>
              <Column title="Post by" dataIndex="owner" key="_id" />
              <Column title="Topic" dataIndex="topic" key="_id" />
              <Column title="Post at" dataIndex="created_at" key="_id" />
              <Column
                // width="50px;"
                title="Tags"
                dataIndex="tags"
                key="_id"
                ellipsis={{ showTitle: false }}
                render={tags => (
                  <>
                    <Tooltip
                      placement="topLeft"
                      color="rgb(0 0 0 / 15%)"
                      title={() => (<div>{tags.map(tag => (
                        <Tag color="blue" key={tag}>
                          {tag}
                        </Tag>
                      ))}</div>)}
                    >
                      {tags.map(tag => (
                        <Tag color="blue" key={tag}>
                          {tag}
                        </Tag>
                      ))}
                    </Tooltip>
                  </>
                )}
              />
            </Table>

          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(Blog)

