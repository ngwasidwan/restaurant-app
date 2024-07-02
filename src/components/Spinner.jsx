function Spinner() {
  return (
    <div className="w-full flex items-center justify-center h-[70vh] ">
      <div className="w-[3rem] h-[3rem]  rounded-full border-[6px] border-r-yellow-100 border-b-yellow-100 border-l-yellow-300 border-t-yellow-300 animate-spin  ">
        &nbsp;
      </div>
    </div>
  );
}

export default Spinner;
