// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetail, toggleStar} = props
  const {title, date, id, isStar} = appointmentDetail

  const onClickStar = () => {
    toggleStar(id)
  }
  const urlImage = isStar
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-container">
      <div>
        <p className="title-style">{title}</p>
        <p className="date-style">{date}</p>
      </div>
      <button
        type="button"
        testid="star"
        className="button1"
        onClick={onClickStar}
      >
        <img className="star-style" src={urlImage} alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
