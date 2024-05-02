import NotesMenu from "./components/menu"
import Display from "./components/display"
import { marked } from 'marked';

import "./notes.css"

import { theme, Layout } from 'antd';
import { useState } from "react";
import { SmileOutlined } from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;

function readMdFiles(url) {
    return fetch(url).then((response) => {
        return response.text()
    })
}


function NotesPannel() {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const layoutStyle = {
        height: "100%",
        width: "100%",
        maxWidth: "1080px",
        margin: "0 auto"
    }

    const headerStyle = {
        background: colorBgContainer
    }
    const contentStyle = {
        paddingLeft: 50,
        paddingRight: 50,
        overflow: 'auto'
    }

    let [mdContent, setMdContent] = useState('')

    function loadMdContent(obj) {
        readMdFiles(obj.item.props.path).then(file => {
            setMdContent(marked.parse(file))
        })
    }

    return (
        <div className="notesPanel">
            <Layout style={layoutStyle}>
                <Sider theme='light' breakpoint="md" className="menuSider">
                    <NotesMenu onMenuClick={loadMdContent} />
                </Sider>
                <Layout>
                    <Header style={headerStyle} className="notesHeader">
                        <div>JHao</div>
                        <div >
                            <SmileOutlined />
                        </div>
                    </Header>
                    <Content style={contentStyle}>
                        <Display content={mdContent}></Display>
                    </Content>
                    <Footer>
                        <ul className="notesFooter">
                            <li><span>Author：</span>JHao</li>
                            <li><span>Tel：</span>13880321621</li>
                            <li><span>Email：</span>for-JHao@outlook.com</li>
                        </ul>
                    </Footer>
                </Layout>
            </Layout>
        </div>
    )
}


export default NotesPannel