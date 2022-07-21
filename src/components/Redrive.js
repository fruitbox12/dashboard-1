import Dropdown from 'react-bootstrap/Dropdown'

const Redrive = ({ message, onResend }) => {
  return (
    <Dropdown.Item onClick={() => onResend(message)}>Redrive</Dropdown.Item>
  )
}

export default Redrive