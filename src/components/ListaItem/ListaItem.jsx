import Item from '../Item/Item';

export default function ListaItem({ listaItems, eliminarTour }) {

    //console.log(listaItems);
    return (
        <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {listaItems.map((item) => (
                <Item
                    key={`${item.tipo}-${item.id}`}
                    item={item}
                    eliminarTour={eliminarTour}
                />
            ))}           
        </div>
    )
}
