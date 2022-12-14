export interface ICategory {
  id: number;
  title: string;
}
export interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  createdAt: string;
  category: { id: number };
}
export interface ITruck {
  truckId: string;
  truckModel: string;
  truckName: string;
  truckDescription: string;
  truckLoadCapacity: string;
}
export interface IStop {
  stopId: string;
  stopName: string;
  stopDescription: string;
  stopAddress: string;
}
export interface IPackage {
  packageId: string;
  packageName: string;
  packageDescription: string;
  packageWeight: string;
  packageVolume: string;
}
export interface IForum {
  forumId: string;
  forumName: string;
  forumDescription: string;
}
export interface IComment {
  commentId: string;
  commentName: string;
  commentDescription: string;
}
export interface ITrip {
  tripId: string;
  truckId: string;
  stopId: string;
  packageId: string;
  tripName: string;
  tripDescription: string;
  tripStartAddress: string;
  tripEndAddress: string;
}
