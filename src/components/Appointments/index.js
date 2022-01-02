// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    title: '',
    date: '',
    isStaredButtonClicked: false,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onAddingAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const dateFormat = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: uuidv4(),
      title,
      date: dateFormat,
      isStar: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  toggleStar = id => {
    const {appointmentList} = this.state
    this.setState({
      appointmentList: appointmentList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStar: !eachAppointment.isStar}
        }
        return eachAppointment
      }),
    })
  }

  staredAppointments = () => {
    const {appointmentList, isStaredButtonClicked} = this.state
    if (isStaredButtonClicked === false) {
      const filterList = appointmentList.filter(
        eachAppointment => eachAppointment.isStar === true,
      )
      this.setState({
        appointmentList: filterList,
        isStaredButtonClicked: true,
        apList: appointmentList,
      })
    } else {
      const {apList} = this.state
      this.setState({appointmentList: apList, isStaredButtonClicked: false})
    }
  }

  render() {
    const {title, date, appointmentList, isStaredButtonClicked} = this.state
    console.log(appointmentList)
    const styleBasedOnStared = isStaredButtonClicked
      ? 'button-voilet'
      : 'button2'

    return (
      <div className="background-container">
        <div className="Appointment-form-container">
          <div className="container">
            <form
              className="Appointment-form"
              onSubmit={this.onAddingAppointment}
            >
              <h1>Add Appointment</h1>
              <label htmlFor="input">TITLE</label>
              <input
                className="input-element"
                type="text"
                value={title}
                id="input"
                onChange={this.onChangeTitle}
              />
              <label htmlFor="date">DATE</label>
              <input
                className="input-element"
                type="date"
                id="date"
                value={date}
                onChange={this.onChangeDate}
              />
              <button className="button" type="submit">
                Add
              </button>
            </form>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="horizontal-line" />
          <div>
            <div className="app-star-container">
              <h1 className="heading-appointment">Appointments</h1>
              <button
                className={styleBasedOnStared}
                type="button"
                onClick={this.staredAppointments}
              >
                Starred
              </button>
            </div>
            <ul className="unordered-container">
              {appointmentList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetail={eachAppointment}
                  toggleStar={this.toggleStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
