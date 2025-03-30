export const executeQuery = (query, data) => {
  if (!data || data.length === 0) return [];

  let match;

  // 1️⃣ SELECT * FROM table;
  if (/SELECT \* FROM/i.test(query)) {
    return data;
  }

  // 2️⃣ SELECT column1, column2 FROM table;
  if ((match = query.match(/SELECT (.+) FROM/i))) {
    const columns = match[1].split(",").map(col => col.trim());
    return data.map(row => {
      let filteredRow = {};
      columns.forEach(col => {
        if (col in row) filteredRow[col] = row[col];
      });
      return filteredRow;
    });
  }

  // 3️⃣ WHERE clause (basic filtering)
  if ((match = query.match(/WHERE (\w+) *(=|>|<) *['"]?([^'"]+)['"]?/i))) {
    const column = match[1];
    const operator = match[2];
    const value = isNaN(match[3]) ? match[3] : Number(match[3]);

    return data.filter(row => {
      if (!(column in row)) return false;
      switch (operator) {
        case "=": return row[column] == value;
        case ">": return row[column] > value;
        case "<": return row[column] < value;
        default: return false;
      }
    });
  }

  // 4️⃣ ORDER BY column ASC/DESC
  if ((match = query.match(/ORDER BY (\w+) (ASC|DESC)?/i))) {
    const column = match[1];
    const order = match[2] === "DESC" ? -1 : 1;

    return [...data].sort((a, b) => {
      if (!(column in a) || !(column in b)) return 0;
      return a[column] > b[column] ? order : -order;
    });
  }

  // 5️⃣ LIMIT clause
  if ((match = query.match(/LIMIT (\d+)/i))) {
    const limit = Number(match[1]);
    return data.slice(0, limit);
  }

  return data; // Return unmodified if query is not recognized
};
