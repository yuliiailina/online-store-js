export function checkLoadMore(total, skip, limit) {
    return total - skip - limit > 0;
}