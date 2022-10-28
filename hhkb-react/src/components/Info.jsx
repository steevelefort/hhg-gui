const Info = function({info}) {
  return (
    <div className="info-block">
      {info.map( (item) => (
        <div key={item.key} className="info">{item.key}: {item.value}</div>
      ))}
    </div>
  );
}

export default Info;
