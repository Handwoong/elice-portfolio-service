function Empty({ index }) {
  return (
    <>
      <div
        key={index}
        style={{
          margin: "22px",
          textAlign: "center",
        }}
      >
        <img src="/empty.png" alt="λΉμ΄μμ" width="50%"></img>
      </div>
    </>
  );
}

export default Empty;
