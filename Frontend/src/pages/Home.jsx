import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import axios from "axios"
import TicketForm from "../components/TicketForm"

import {
  FaTicketAlt,
  FaCheckCircle,
  FaSpinner,
  FaExclamationCircle
} from "react-icons/fa"

function Home() {

  const [tickets, setTickets] = useState([])
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")

  const fetchTickets = async () => {

    const response = await axios.get(
      `http://127.0.0.1:8000/api/tickets?search=${search}&status=${status}`
    )

    setTickets(response.data)
  }

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

  useEffect(() => {
    fetchTickets()
  }, [search, status])

  const openTickets = tickets.filter(
    t => t.status === "Open"
  ).length

  const progressTickets = tickets.filter(
    t => t.status === "In Progress"
  ).length

  const closedTickets = tickets.filter(
    t => t.status === "Closed"
  ).length
  

  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-slate-900
      via-blue-900
      to-slate-800
      text-white
      p-8
    ">

      {/* Header */}

      <div className="
        flex
        justify-between
        items-center
        mb-10
      ">

        <div>
          <h1 className="
            text-5xl
            font-extrabold
            tracking-wide
          ">
            Support CRM
          </h1>

          <p className="text-gray-300 mt-2">
            Customer Ticket Management Dashboard
          </p>
        </div>

      </div>

      {/* Stats Cards */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-4
        gap-6
        mb-10
      ">

      <motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.98 }}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="bg-white/10
    backdrop-blur-lg
    rounded-2xl
    p-6
    shadow-lg"
    className="
  bg-BLACK/10
  backdrop-blur-lg
  rounded-2xl
  p-6
  shadow-lg
"
>
</motion.div>
          


          <div className="
            flex
            justify-between
            items-center
          ">
            <div>
              <p className="text-gray-300">
                Total Tickets
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {tickets.length}
              </h2>
            </div>

            <FaTicketAlt size={40} />
          </div>

        </div>

        <div className="
          bg-yellow-500/20
          rounded-2xl
          p-6
          shadow-lg
          hover:scale-105
          transition
        ">

          <div className="
            flex
            justify-between
            items-center
          ">
            <div>
              <p>Open</p>

              <h2 className="text-4xl font-bold mt-2">
                {openTickets}
              </h2>
            </div>

            <FaExclamationCircle size={40} />
          </div>

        </div>

        <div className="
          bg-blue-500/20
          rounded-2xl
          p-6
          shadow-lg
          hover:scale-105
          transition
        ">

          <div className="
            flex
            justify-between
            items-center
          ">
            <div>
              <p>In Progress</p>

              <h2 className="text-4xl font-bold mt-2">
                {progressTickets}
              </h2>
            </div>

            <FaSpinner size={40} />
          </div>

        </div>

        <div className="
          bg-green-500/20
          rounded-2xl
          p-6
          shadow-lg
          hover:scale-105
          transition
        ">

          <div className="
            flex
            justify-between
            items-center
          ">
            <div>
              <p>Closed</p>

              <h2 className="text-4xl font-bold mt-2">
                {closedTickets}
              </h2>
            </div>

            <FaCheckCircle size={40} />
          </div>

        </div>

      

      {/* Form */}

      <TicketForm fetchTickets={fetchTickets} />

      {/* Search */}

      <div className="
        flex
        flex-col
        md:flex-row
        gap-4
        mb-6
      ">

        <input
          type="text"
          placeholder="Search tickets..."
          className="
            p-4
            rounded-xl
            bg-white/10
            border
            border-white/20
            text-white
            w-full
            outline-none
          "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="
            p-4
            rounded-xl
            bg-white/10
            border
            border-white/20
            text-white
            outline-none
          "
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >

          <option value="">All</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>

        </select>

      </div>



      {/* Table */}

      <div className="
        bg-white/10
        backdrop-blur-lg
        rounded-2xl
        overflow-hidden
        shadow-2xl
      ">

        <table className="w-full">

          <thead className="bg-white/20">

            <tr>

              <th className="p-5 text-left">
                Ticket ID
              </th>

              <th className="text-left">
                Customer
              </th>

              <th className="text-left">
                Subject
              </th>

              <th className="text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {tickets.map((ticket) => (

              <tr
                key={ticket.ticket_id}
                className="
                  border-b
                  border-white/10
                  hover:bg-white/10
                  transition
                "
              >

                <td className="p-5 font-semibold">
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
                      updateStatus(
                        ticket.ticket_id,
                        e.target.value
                      )
                    }
                    className={`
                      px-3
                      py-2
                      rounded-lg
                      font-semibold
                      border-none
                      outline-none

                      ${ticket.status === "Open"
                        ? "bg-yellow-200 text-yellow-900"
                        : ticket.status === "In Progress"
                        ? "bg-blue-200 text-blue-900"
                        : "bg-green-200 text-green-900"
                      }
                    `}
                  >

                    <option value="Open">
                      Open
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Closed">
                      Closed
                    </option>

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