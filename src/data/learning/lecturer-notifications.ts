export type LecturerNotificationType =
  | "submission"
  | "module"
  | "progress"
  | "participant";

export interface LecturerNotification {
  id: string;
  type: LecturerNotificationType;
  title: string;
  description: string;
  time: string;
  href: string;
  read: boolean;
}

export function getLecturerNotifications(): LecturerNotification[] {
  return [
    {
      id: "submission-quiz-anc",
      type: "submission",
      title: "Pengumpulan Kuis",
      description:
        "12 mahasiswa telah mengerjakan Kuis Pemahaman Pemeriksaan Kehamilan.",
      time: "Baru saja",
      href: "/dashboard/lecturer/gradebook/1",
      read: false,
    },
    {
      id: "module-progress-anc",
      type: "progress",
      title: "Progres Mahasiswa",
      description:
        "Mayoritas mahasiswa sudah menyelesaikan lebih dari 70% modul ANC Terpadu.",
      time: "Hari ini",
      href: "/dashboard/lecturer/modules/1",
      read: false,
    },
    {
      id: "participant-newborn",
      type: "participant",
      title: "Mahasiswa Bergabung",
      description:
        "5 mahasiswa baru bergabung pada modul Perawatan Bayi Baru Lahir.",
      time: "Kemarin",
      href: "/dashboard/lecturer/modules/2",
      read: true,
    },
    {
      id: "module-published-newborn",
      type: "module",
      title: "Modul Dipublikasi",
      description:
        "Modul APGAR Score & Resusitasi sudah tersedia untuk mahasiswa.",
      time: "1 hari lalu",
      href: "/dashboard/lecturer/modules/2",
      read: true,
    },
  ];
}