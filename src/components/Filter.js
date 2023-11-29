export default function Filter(props) {
  let monthArr = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
  ];
  let yearArr = Array.from(
    new Set(props.data.map(note => note.date.split("-")[0]))
  );

  return (
    <div className="filters-container mt-2 mb-2">
      <h3 className="text-md text-primary">Filters</h3>
      <select onChange={props.handleFilter} name="month" id="month">
        <option value="" selected>
          Select Month
        </option>
        {monthArr.map((month, idx) => (
          <option key={month} value={idx + 1}>
            {month}
          </option>
        ))}
      </select>
      <select onChange={props.handleFilter} name="year" id="year">
        <option value="" selected>
          Select Year
        </option>
        {yearArr.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select onChange={props.handleFilter} name="sortBy" id="sortBy">
        <option value="" selected>
          Order By
        </option>
        <option value="newest">newest first</option>
        <option value="oldest">oldest first</option>
      </select>
      <select onChange={props.handleFilter} name="week" id="week">
        <option value="" selected>
          Choose Current Week
        </option>
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
    </div>
  );
}
