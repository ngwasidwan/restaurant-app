import { useMyContext } from "../services/useMyContext";

function Description() {
  const { itemData, setCanEdit, setOpenForm } = useMyContext()
  return (
    <div className="w-full md:col-start-2 col-span-full pb-2">
      {" "}
      <figure className="rounded-md h-[12rem] overflow-hidden relative mb-2">
        <img src={itemData.image} alt="food image" className="blur-[2px] " />
        <figcaption className="absolute bottom-0 z-10 right-0 bg-yellow-100 md:font-bold font-semibold text-lg px-4 py-2 bg-opacity-50 italic  ">
          {itemData.meal}
        </figcaption>
      </figure>
      <h3 className="font-semibold mb-2">Description</h3>
      <p className=" mb-4 text-stone-700 text-lg ">{itemData.description}</p>
      <div className="flex ">
        <div>
          <span className="italic md:text-base text-sm mr-2">Price :</span>
          <span className="font-bold text-base">{itemData.price}</span>
          <span className="text-sm"> FCFA</span>
        </div>
        <button
          className="bg-yellow-500 uppercase px-3  py-1.5  font-semibold rounded-md border-2 border-yellow-500 hover:bg-yellow-50 transition-all ml-auto "
          onClick={() => {
            setOpenForm(true);
            setCanEdit(false);
          }}
        >
          place order{" "}
        </button>
      </div>
    </div>
  );
}

export default Description;
