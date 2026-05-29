import { useEffect, useState } from "react"
import axios from "axios"
import TicketForm from "../components/TicketForm"

function Home() {

  const [tickets, setTickets] = useState([])
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")

  const fetchTickets = async () => {
    const updateStatus = async (ticketId, newStatus) => {

  await axios.put(
    `http://127.0.0.1:8000/api/tickets/${ticketId}`,
    {
      status: newStatus,
      notes: ""
    }
  )

  fetchTickets()
}

    const response = await axios.get(
      `http://127.0.0.1:8000/api/tickets?search=${search}&status=${status}`
    )

    setTickets(response.data)
  }

  useEffect(() => {
    fetchTickets()
  }, [search, status])

const updateStatus = async (ticketId, newStatus) => {

  await axios.put(
    `http://127.0.0.1:8000/api/tickets/${ticketId}`,
    {
      status: newStatus,
      notes: ""
    }
  )

  fetchTickets()
}
  return (
    <div className="bg-gray-100 min-h-screen p-8">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Support CRM Dashboard
        </h1>
      </div>

      <TicketForm fetchTickets={fetchTickets} />

      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Search tickets..."
          className="border p-3 rounded-lg w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-3 rounded-lg"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>
              <th className="p-4 text-left">Ticket ID</th>
              <th className="text-left">Customer</th>
              <th className="text-left">Subject</th>
              <th className="text-left">Status</th>
            </tr>

          </thead>

          <tbody>

            {tickets.map((ticket) => (

              <tr
                key={ticket.ticket_id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4 font-semibold">
                  {ticket.ticket_id}
                </td>

                <td>
                  {ticket.customer_name}
                </td>

                <td>
                  {ticket.subject}
                </td>

               <td>

  <select
    value={ticket.status}
    onChange={(e) =>
      updateStatus(ticket.ticket_id, e.target.value)
    }
    className="border p-2 rounded-lg"
  >

    <option value="Open">Open</option>
    <option value="In Progress">In Progress</option>
    <option value="Closed">Closed</option>

  </select>

</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Home