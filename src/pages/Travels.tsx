import { useNavigate } from 'react-router-dom';
import { useState, useLayoutEffect, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { faHouse, faUser, faPlus } from '@fortawesome/free-solid-svg-icons';
import { withNavigation } from './withNavigation';
import { Travel } from '../models/travel.model';
import { TopNav } from '../components/common/TopNav';
import { FloatingNavButton as CreateTravelButton } from '../components/common/FloatingNavButton';
import { TravelCard } from '../components/common/TravelCard';
import { EmptyCard } from '../components/home/EmptyCard';

const rootEl = document.getElementById('root')!;

export const Travels = withNavigation(() => {
  const navigate = useNavigate();
  const [currentTravel, setCurrentTravel] = useState<Travel | null>();
  const [upcomingTravels, setUpcomingTravels] = useState<Travel[] | null>();
  const [completedTravels, setCompletedTravels] = useState<Travel[] | null>();
  const [top, setTop] = useState<string>(
    parseInt(rootEl.style.height) -
      8 * (Math.round(16 * Math.cbrt(parseInt(rootEl.style.width) / 1440) * 100) / 100) +
      'px'
  );
  const { data } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const result = await axios.get(
        `http://localhost:3000/api/travels/${import.meta.env.VITE_TEST_USER_UUID}`
      );
      return result;
    },
  });

  const clickTravelHandler = (travel_id: number) => {
    navigate(`/travels/${travel_id}`);
  };

  useLayoutEffect(() => {
    let timeoutId = 0;
    function debounceSetTop() {
      if (timeoutId !== 0) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        setTop(
          parseInt(rootEl.style.height) -
            8 * (Math.round(16 * Math.cbrt(parseInt(rootEl.style.width) / 1440) * 100) / 100) +
            'px'
        );
      }, 250);
    }

    window.addEventListener('resize', debounceSetTop);
    screen.orientation.addEventListener('change', debounceSetTop);

    return () => {
      window.removeEventListener('resize', debounceSetTop);
      screen.orientation.removeEventListener('change', debounceSetTop);
    };
  }, []);

  useEffect(() => {
    console.log('data?.data.data:', data?.data.data);
    if (data) {
      const ongoingTravels = data.data.data.ongoingTravels;
      const upcomingTravels = data.data.data.upcomingTravels;
      const completedTravels = data.data.data.completedTravels;
      if (ongoingTravels.length > 0) {
        setCurrentTravel(ongoingTravels[0]);
        if (upcomingTravels.length > 0) {
          setUpcomingTravels(upcomingTravels);
        }
      } else if (upcomingTravels.length > 0) {
        setCurrentTravel(upcomingTravels[0]);
        if (upcomingTravels.length >= 2) {
          setUpcomingTravels(upcomingTravels.slice(1));
        }
      } else {
        setCurrentTravel(null);
      }
      setCompletedTravels(completedTravels);
    }
  }, [data]);

  return (
    <div className="relative p-6 bg-primary-100 min-h-full flex flex-col gap-5">
      <div className="absolute pr-12 w-full">
        <TopNav
          navIconInfos={[
            { id: faHouse, title: '홈 화면으로 이동하기', route: '/' },
            { id: faUser, title: '마이페이지로 이동하기', route: '/mypage' },
          ]}
          bgColor="bg-primary-400"
          iconColor="text-primary-200"
          title="여행 목록"
          titleColor="text-primary-100"
        />
      </div>
      <CreateTravelButton
        navIconInfo={{ id: faPlus, title: '새로운 여행 추가하기', route: '/travels/create' }}
        top={top}
      />

      {/* 예정된 여행들 */}
      {upcomingTravels &&
        upcomingTravels.map((travel) => (
          <TravelCard
            key={travel.travel_id}
            travel={travel}
            travelStatus="upcoming"
            onClickHandler={() => clickTravelHandler(travel.travel_id)}
          />
        ))}

      {/* 현재 진행중인 여행 */}
      {currentTravel ? (
        <TravelCard
          travel={currentTravel}
          travelStatus="ongoing"
          onClickHandler={() => clickTravelHandler(currentTravel.travel_id)}
        />
      ) : (
        <EmptyCard />
      )}

      {/* 완료된 여행들 */}
      {completedTravels &&
        completedTravels.map((travel) => (
          <TravelCard
            key={travel.travel_id}
            travel={travel}
            travelStatus="completed"
            onClickHandler={() => clickTravelHandler(travel.travel_id)}
          />
        ))}
    </div>
  );
});
