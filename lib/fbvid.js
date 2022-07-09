import got from 'got';
import slugify from 'slugify';

const msg = 'Either the video is deleted or it\'s not shared publicly!';

const lowresponseolution = async link => {
	try {
		const response = await got(link);
		const link_1 = response.body.split('sd_src:"')[1].split('",hd_tag')[0];
		return {
			url: link_1
		};
	} catch (error) {
		if (error) {
			error.message = msg;
		}
		return error.message;
	}
};

const highresponseolution = async link => {
	try {
		const response = await got(link);
		const link_1 = response.body.split('hd_src:"')[1].split('",sd_src:"')[0];
		return {
			url: link_1
		};
	} catch (error) {
		if (error) {
			error.message = msg;
		}
		return error.message;
	}
};

const VideoTitle = async link => {
	try {
		const response = await got(link);
		const link_1 = response.body.split('<title id="pageTitle">')[1].split('</title>')[0];
		return {
			url: link_1
		};
	} catch (error) {
		if (error) {
			error.message = msg;
		}
		return error.message;
	}
};

const SEOTitle = async link => {
	try {
		const response = await got(link);
		const link_1 = response.body.split('<title id="pageTitle">')[1].split('</title>')[0];
		const title = slugify(link_1, {
			replacement: '-',
			remove: /[*+~.()'"!:@]/g,
			lower: true,
			strict: true
		});
		return {
			url: title
		};
	} catch (error) {
		if (error) {
			error.message = msg;
		}
		return error.message;
	}
};

export const low = lowresponseolution;
export const high = highresponseolution;
export const title = VideoTitle;
export const slug = SEOTitle;