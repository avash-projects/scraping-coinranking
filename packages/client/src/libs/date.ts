export const getLocalDateTime = (date: string) => {
    const now = new Date(date);
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();

    return `${dateString} ${timeString}`;
}