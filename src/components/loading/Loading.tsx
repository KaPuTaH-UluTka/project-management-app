import loading from '../../assets/loading.gif';

import './loading.scss';

const Loading = () => {
  return (
    <div className="loading">
      <img src={loading} alt="loading" />
    </div>
  );
};

export default Loading;
