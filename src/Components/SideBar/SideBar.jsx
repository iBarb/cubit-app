import { useAutoAnimate } from '@formkit/auto-animate/react'
import { UseSession } from '../../Context/SessionContext';

const SideBar = () => {
    const [parent] = useAutoAnimate()
    const { session, FormatTime } = UseSession()

    return (
        <div className="d-flex flex-column flex-shrink-0 py-3 px-2 bg-body-tertiary h-100 rounded" style={{ width: '280px' }}>
            <div className="out-table">
                <table className="table table-sm text-center" style={{ width: '100%' }} >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Time</th>
                            <th>ao5</th>
                            <th>ao12</th>
                        </tr>
                    </thead>
                    <tbody ref={parent}>
                        {session && session.length > 0 &&
                            session.slice().reverse().map((item, index ,array) => {
                                const reverseIndex = array.length - index;
                                return (
                                    <tr key={item.id}>
                                        <td>{reverseIndex}</td>
                                        <td>{FormatTime(item.time)}</td>
                                        <td>{FormatTime(item.ao5)}</td>
                                        <td>{FormatTime(item.ao12)}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SideBar;
