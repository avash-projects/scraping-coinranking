import { Typography } from "antd"
const { Text } = Typography;


const getLocalDateTime = (date: string) => {
    const now = new Date(date);
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();

    return `${dateString} ${timeString}`;
}

const DateInfo = (props: { sx?: React.CSSProperties, date: string, totalDocs: number }) => {
    const { sx, date, totalDocs } = props
    return (
        <>
            <span style={sx}>
                <Text type="secondary" style={{ marginLeft: '10px' }}>Last scrape: {getLocalDateTime(date)}</Text>
                <Text type="secondary" style={{ marginLeft: '10px' }}>Total coins: {totalDocs}</Text>
            </span >
        </>
    )
}

export default DateInfo