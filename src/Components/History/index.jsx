const History = (props) => {
  console.log('History', props)
  return (
    <>
        <details>
        <summary>
          History
        </summary>
          <ul>
            {
              props.history ?
                props.history.map((record, idx) => (
                  <li key={`history${idx}`}>
                    {record[0].url}
                  </li>
                ))
                : ''
            }
          </ul>
      </details>
    </>
  );
};


export default History;