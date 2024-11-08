import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './SubscribePage.module.css';
import {
  addNonHgnUserEmailSubscription,
  confirmNonHgnUserEmailSubscription,
} from '../../actions/sendEmails';
import ConfirmationMessage from './ConfirmationMessage';

function SubscribePage() {
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [confirmationStatus, setConfirmationStatus] = useState(false);

  useEffect(() => {
    const token = query.get('token');
    if (token) {
      confirmNonHgnUserEmailSubscription(token).then(result => {
        if (result.success) {
          // Handle success
          setConfirmationStatus(true);
          setConfirmationMessage('Successfully confirmed email subscription');
        } else {
          // Handle failure
          setConfirmationStatus(false);
          setConfirmationMessage('Confirmation expired, please try again');
        }
      });
    }
  }, [query]);

  const validateEmail = inputEmail => {
    return /\S+@\S+\.\S+/.test(inputEmail);
  };

  const confirmationMessageCallback = () => {
    setConfirmationMessage('');
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (validateEmail(email)) {
      dispatch(addNonHgnUserEmailSubscription(email));
      setEmail('');
      setError('');
    } else {
      setError('Please enter a valid email address.');
    }
  };

  if (confirmationMessage) {
    return (
      <ConfirmationMessage
        message={confirmationMessage}
        isSuccess={confirmationStatus}
        confirmationMessageCallback={confirmationMessageCallback}
      />
    );
  }

  return (
    <div className={styles.subscribeContainer}>
      <div className={styles.oneCommunityIcon} />
      <h1 className={styles.header}>Subscribe for Weekly Updates</h1>
      {/* ... */}
      <p className={styles.description}>
        Join our mailing list for updates. We&apos;ll send a confirmation to ensure you&apos;re the
        owner of the email provided. Once confirmed, we promise only a single email per week.
        Don&apos;t forget to check your spam folder if you didn&apos;t receive the confirmation!
      </p>
      <p className={styles.note}>
        Want to opt out later? No problem, every email has an unsubscribe link at the bottom.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={`${styles.inputField} ${error ? styles.error : ''}`}
        />
        <button className={styles.subscribeButton} type="submit">
          Subscribe
        </button>
        {error && <div className={styles.errorMessage}>{error}</div>}
      </form>
      {/* ... */}
    </div>
  );
}

export default SubscribePage;
