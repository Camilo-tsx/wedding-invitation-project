
interface DBQueryResult {
    query: string,
    values: any[]
}

export const dbQuery = (param: Record<string, any>, id: string, table: string): DBQueryResult  => {

    const setUpdates: string[] = [];
    const values: any[] = []

    for (const [key, value] of Object.entries(param)) {
        if (value !== undefined) {
            setUpdates.push(`${key} = ?`);
            values.push(value)
        }
    }

    const query = `UPDATE ${table} SET ${setUpdates.join(",")} WHERE id= UUID_TO_BIN(?)`
    values.push(id)

    return {query, values};
}