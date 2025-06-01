import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient"

const UserChat = ({chat, user}) => {
  const recipientUser = useFetchRecipientUser(chat, user);
  console.log("Recipient User hhh:", recipientUser?.recipientUser?.name);

  return (
    <Stack direction="horizontal" gap={3} className="align-items-center user-card p-2 justify-content-between">
      <div className="d-flex">
        <div className="me-2">
          A
        </div>
        <div className="text-content pt-50">
          <div className="name">
            {recipientUser?.recipientUser?.name}
          </div>
          <div className="text">
            Text Message
          </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">12/12/2022</div>
        <div className="this-user-notifications">2</div>
      </div>
    </Stack>
  )
}

export default UserChat
