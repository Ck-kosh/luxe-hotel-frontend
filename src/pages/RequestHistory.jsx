import {
  useEffect,
  useState,
} from "react";

import {
  getRequests,
} from "../services/serviceApi";

function RequestHistory() {

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function fetchRequests() {

      try {

        const data =
          await getRequests();

        setRequests(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    }

    fetchRequests();

  }, []);

  if (loading) {
    return (
      <p className="p-6">
        Loading...
      </p>
    );
  }

  return (
    <div className="p-6">

      <h1
        className="
        text-3xl
        font-bold
        mb-6"
      >
        My Requests
      </h1>

      {requests.length === 0 ? (

        <p>
          No requests found.
        </p>

      ) : (

        <div className="space-y-4">

          {requests.map(
            (request, index) => (

            <div
              key={index}
              className="
              bg-white
              p-4
              rounded
              shadow"
            >

              <h2 className="font-bold">
                {
                  request.service_type
                }
              </h2>

              <p>
                {
                  request.description
                }
              </p>

              <p
                className="
                text-green-600"
              >
                {
                  request.status ||
                  "Pending"
                }
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default RequestHistory;