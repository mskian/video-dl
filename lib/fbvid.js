const got = require('got');
const slugify = require('slugify');

const msg = 'Either the video is deleted or it\'s not shared publicly!';

const lowresponseolution = link => {
	return got(link).then(response => {
		const link = response.body.split('sd_src:"')[1].split('",hd_tag')[0];
		return {
			url: link
		};
	}).catch(error => {
		if (error) {
			error.message = msg;
		}
		return error.message;
	});
};

const highresponseolution = link => {
	return got(link).then(response => {
		const link = response.body.split('hd_src:"')[1].split('",sd_src:"')[0];
		return {
			url: link
		};
	}).catch(error => {
		if (error) {
			error.message = msg;
		}
		return error.message;
	});
};

const VideoTitle = link => {
	return got(link).then(response => {
		const link = response.body.split('<title id="pageTitle">')[1].split('</title>')[0];
		return {
			url: link
		};
	}).catch(error => {
		if (error) {
			error.message = msg;
		}
		return error.message;
	});
};

const SEOTitle = link => {
	return got(link).then(response => {
        const link = response.body.split('<title id="pageTitle">')[1].split('</title>')[0];
        const title = slugify(link, {
            replacement: '-',
            remove: /[*+~.()'"!:@]/g,
            lower: true,
            strict: true
        });
		return {
			url: title
		};
	}).catch(error => {
		if (error) {
			error.message = msg;
		}
		return error.message;
	});
};

exports.low = lowresponseolution;
exports.high = highresponseolution;
exports.title = VideoTitle;
exports.slug = SEOTitle;