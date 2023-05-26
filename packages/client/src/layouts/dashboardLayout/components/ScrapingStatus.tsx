import { Typography } from "antd"
import { SyncOutlined } from "@ant-design/icons";
const { Text } = Typography;
const ScrapingStatus = (props: { sx?: React.CSSProperties }) => {
    const { sx } = props
    return (
        <>
            <span style={sx}>
                <SyncOutlined style={{ fontSize: 18 }} spin />
                <Text type="secondary" style={{ marginLeft: '10px' }}>syncronizing latest data</Text>
            </span >
        </>
    )
}

export default ScrapingStatus