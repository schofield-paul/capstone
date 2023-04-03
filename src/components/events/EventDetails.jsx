import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  addRsvpAsync,
  fetchSingleEvent,
  selectSingleEvent,
  getMyRsvpsAsync,
  selectMyRsvps,
  removeRsvpAsync,
  deleteEventAsync,
} from '../../slices/eventsSlice';
import { selectAuth } from '../../slices/authSlice';
import { fetchSingleUser, selectUser } from '../../slices/usersSlice';
import Map from '../maps/Map';

const EventDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const event = useSelector(selectSingleEvent);
  const user = useSelector(selectUser);
  const auth = useSelector(selectAuth);

  const myRsvps = useSelector(selectMyRsvps);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchSingleEvent(id));
      setLoading(false);
    };
    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getMyRsvpsAsync(auth.userAuth.id));
      if (event.creatorId) {
        await dispatch(fetchSingleUser(event.creatorId));
      }
      setLoading(false);
    };
    fetchData();
  }, [dispatch, id, event]);
  const alreadyRSVPd = myRsvps.filter((rsvp) => rsvp.eventId === event.id);

  const deleteEvent = async (e) => {
    e.preventDefault();
    await dispatch(deleteEventAsync(id));
    navigate(-1);
  };

  if (!auth.userAuth) {
    //user is not logged in
    return (
      <>
        {loading ? (
          <div>Loading</div>
        ) : (
          <div className="bg-cover bg-no-repeat bg-[url('img/profile-bg.jpg')] h-[calc(100vh_-_10rem)]">
            {/* blue div that holds event details / edit / delete */}
            <div className="bg-bold-blue pl-5 flex pt-3 pb-3  font-rubikmono ">
              <span className="pr-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
              </span>
              Event Details
            </div>
            {/* div with image and info */}
            <div className="pl-5 pt-3  container mx-auto relative">
              <img className="w-100 " src={event.imageSrc} alt="puppy event" />
              <div
                className="w-1/2 pl-3"
                style={{ maxHeight: '400px', overflow: 'hidden' }}
              >
                {/* map */}
                <Map zip={event.zip_code} />
              </div>
              <div className="p-1">Topic: {event.topic}</div>

              <div className="p-1 ">Description: {event.description}</div>
              <button className="ease-in duration-300 hover:bg-bold-purple w-full bg-bold-blue text-white py-3 rounded-xl mx-auto block text-xl hover:transition-all mt-3">
                <Link to={'/login'}>Login to RSVP</Link>
              </button>
            </div>
          </div>
        )}
      </>
    );
  } else {
    // User is logged in
    return (
      <>
        {loading ? (
          <div>Loading</div>
        ) : (
          <div className="bg-cover bg-no-repeat bg-[url('img/profile-bg.jpg')] h-[calc(100vh_-_5rem)] ">
            <div>
              {/* blue div that holds event details / edit / delete */}
              <div className="bg-bold-blue pl-5 flex pt-3 pb-3  font-rubikmono">
                <span className="pr-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                    />
                  </svg>
                </span>
                <span>Event Details</span>
                {auth.userAuth.id === event.creatorId ? (
                  <>
                    <div className="pl-5 flex space-x-4">
                      <Link to={`/events/${id}/edit`}>Edit </Link>
                      <button onClick={deleteEvent}>Delete</button>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              {/* div with image and info */}
              <div className="pl-5 pt-3 container mx-auto relative flex flex-wrap">
                <div className="w-1/2 px-2">
                  <img
                    className="rounded-lg mx-auto max-h-96"
                    src={event.imageSrc}
                    alt="puppy event"
                  />
                </div>
                {/* map */}
                <div
                  className="w-1/2 pl-3"
                  style={{ maxHeight: '400px', overflow: 'hidden' }}
                >
                  <Map zip={event.zip_code} />
                </div>
              </div>

              <div className="p-1">
                <strong>PUP-E-VENT:</strong> {event.topic}
              </div>
              <div className="p-1">
                <strong>PACK LEADER: </strong>{' '}
                <Link to={`/profile/${event.creatorId}`}>
                  {user.singleUser.userName}
                </Link>
              </div>
              <div className="p-1 ">
                <strong>DESCRIPTION:</strong> {event.description}
              </div>
              <div>
                <strong>THE PACK:</strong>
              </div>
              <ul>
                {event.users.length ? (
                  event.users.map((user) => (
                    <li key={user.id}>{user.userName}</li>
                  ))
                ) : (
                  <p>No HOWLR's...yet</p>
                )}
              </ul>
              {!alreadyRSVPd.length ? (
                <button
                  className="ease-in duration-300 hover:bg-bold-purple w-full bg-bold-blue text-white py-3 rounded-xl mx-auto block text-xl hover:transition-all mt-3"
                  onClick={() => {
                    dispatch(addRsvpAsync(event.id));
                    navigate(-1);
                  }}
                >
                  RSVP
                </button>
              ) : (
                <button
                  className="ease-in duration-300 hover:bg-bold-purple w-full bg-bold-blue text-white py-3 rounded-xl mx-auto block text-xl hover:transition-all mt-3"
                  onClick={() => {
                    dispatch(removeRsvpAsync(event.id));
                    navigate(-1);
                  }}
                >
                  Remove RSVP
                </button>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
};
export default EventDetails;
