export default function (data: any[], count: number, currentPage: number, totalPage: number) {
    return {
        data,
        count,
        currentPage,
        totalPage,
    }
}