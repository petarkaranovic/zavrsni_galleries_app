import http from "./http-service";

class GalleryService {
  getAll(term = "", page = 1) {
    return http
      .get("galleries", {
        params: {
          term,
          page
        }
      })
      .then(({ data }) => {
        return data;
      });
  }

  show(id) {
    return http.get(`galleries/${id}`).then(({ data }) => data);
  }

  create({ title, description, images }) {
    return http.post("galleries", {
      title,
      description,
      images
    });
  }
  edit({ title, description, images }, id) {
    return http.put(`galleries/${id}`, {
      title,
      description,
      images
    });
  }
  deleteGallery(id) {
    return http.delete(`gallery/${id}`);
  }
}

const galleryService = new GalleryService();
export default galleryService;
