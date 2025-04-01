type topCarsPropsType = {
    topCarsType: topCar[],
}

type topCar = {
    manufacturer: string,
    model: string,
}

export const MicroTasks = ({topCarsType}: topCarsPropsType) => {

    // const topCars = [
    //     {manufacturer:'BMW', model:'m5cs'},
    //     {manufacturer:'Mercedes', model:'e63s'},
    //     {manufacturer:'Audi', model:'rs6'} ]


    return (
        <table>
            {topCarsType.map((topCar: topCar, index: number) => {
                debugger
                return (
                    <tr key={index}>
                        <th>{topCar.manufacturer}</th>
                        <td>{topCar.model}</td>
                    </tr>
                )
            })}

        </table>
    );
};