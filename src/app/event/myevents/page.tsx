import { MyEvents } from "@/features/event/myevents/components/MyEvents";
const MyEventsPage = async () => {
  return (
    <div>
      <picture>
        <source media="(min-width: 1024px)" srcSet="/desktbg.png" />
        <source media="(min-width: 768px)" srcSet="/tabletbg.png" />
        <img
          src="/sessionbg.png"
          alt="comet"
          className="absolute left-0 top-0 w-full h-[100dvh] object-cover"
        />
      </picture>
      <div className="relative w-full min-h-500px h-full bg-transparent">
        <MyEvents />
      </div>
    </div>
  );
};

export default MyEventsPage;
