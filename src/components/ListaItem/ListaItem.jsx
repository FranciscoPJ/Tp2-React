import Item from '../Item/Item';
import React from 'react'

export default function ListaItem({ listaItems, eliminarTour }) {

    //console.log(listaItems);
    return (
        <div>
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
