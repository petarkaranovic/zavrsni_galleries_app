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
  authorsGalleries(id, term = "", page = 1) {
    return http
      .get(`authors-galleries/${id}`, {
        params: {
          id,
          term,
          page
        }
      })
      .then(({ data }) => data);
  }
  myGalleries(term = "", page = 1) {
    return http
      .get("my-galleries", {
        params: {
          term,
          page
        }
      })
      .then(({ data }) => data);
  }
  addComment({ content, id }) {
    return http
      .post(`my-galleries/${id}`, {
        content
      })
      .then(({ data }) => data);
  }
  deleteComment(id) {
    return http.delete(`comment/${id}`);
  }
}

const galleryService = new GalleryService();
export default galleryService;
