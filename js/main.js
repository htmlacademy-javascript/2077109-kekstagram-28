import { createArrayDescriptionsPhoto } from './data.js';
import { createMiniatures } from './miniatures.js';
import { renderBigPhoto } from './show-full-size-photo.js';
const pictures = createArrayDescriptionsPhoto();
createMiniatures(pictures);
renderBigPhoto(pictures);
