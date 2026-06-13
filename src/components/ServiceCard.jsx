import { Link } from "react-router-dom";

function ServiceCard({ title, route }) {

    return (

        <div className="bg-white rounded-lg shadow-md p-6 m-4 w-64">

            <h3 className="text-xl font-semibold mb-2">{title}</h3>

            <Link to={route} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">

                View Details

            </Link>

        </div>

    )

}

export default ServiceCard