import { useState } from "react"
import axios from "axios"

function TicketForm({ fetchTickets }) {
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    await axios.post(
      "http://127.0.0.1:8000/api/tickets",
      formData
    )

    setFormData({
      customer_name: "",
      customer_email: "",
      subject: "",
      description: ""
    })

    fetchTickets()
    setSuccess(true)

setTimeout(() => {
  setSuccess(false)
}, 3000)
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow mb-8"
    >
{
  success && (
    <div className="
      bg-green-100
      text-green-700
      p-3
      rounded-lg
      mb-4
    ">
      Ticket Created Successfully ✅
    </div>
  )
}
      <h2 className="text-2xl font-bold mb-6">
        Create New Ticket
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <input
          type="text"
          name="customer_name"
          placeholder="Customer Name"
          className="border p-3 rounded-lg"
          value={formData.customer_name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="customer_email"
          placeholder="Customer Email"
          className="border p-3 rounded-lg"
          value={formData.customer_email}
          onChange={handleChange}
          required
        />

      </div>

      <input
        type="text"
        name="subject"
        placeholder="Subject"
        className="border p-3 rounded-lg w-full mt-4"
        value={formData.subject}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        className="border p-3 rounded-lg w-full mt-4 h-32"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="
          bg-blue-600
          text-white
          px-6
          py-3
          rounded-lg
          mt-4
          hover:bg-blue-700
        "
      >
        Create Ticket
      </button>

    </form>
  )
}

export default TicketForm