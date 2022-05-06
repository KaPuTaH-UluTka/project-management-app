import { useAppSelector } from '../../hooks/hooks';
import { Navigate } from 'react-router-dom';
import { pathes } from '../../pathes/pathes';

import './welcome.scss';

import welcome from '../../assets/welcome.png';

export const Welcome = () => {
  const { isLogined } = useAppSelector((state) => state.loginReducer);
  return isLogined ? (
    <Navigate to={pathes.main} />
  ) : (
    <section className="welcome">
      <div className="container">
        <div className="welcome__inner">
          <div className="welcome__info">
            <h1 className="welcome__info-title"> Welcome to our Tello</h1>
            <div className="welcome__info-descr">
              Trello is a visual tool that allows your team to manage projects, workflows, and tasks
              of all types. Add files, task lists - and customize it all so that it is convenient
              for the team to work.
            </div>
            <div className="welcome__info-developers">
              <b>The project was created by: </b>
              <a href="">@KaPuTaH-UluTka</a>, <a href="">@anterebol</a>, <a href="">@Mikel2003</a>
            </div>
          </div>

          <div className="welcome__img">
            <img src={welcome} alt="greeting image" />
          </div>
        </div>
      </div>
    </section>
  );
};
