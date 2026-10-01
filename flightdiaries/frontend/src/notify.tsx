
interface NotifyProps {
  message: string;
}

const Notify = ({ message }: NotifyProps) => {
  if (!message) {
    return null;
  }

  return (
    <div>
      {message}
    </div>
  );
};

export default Notify;

