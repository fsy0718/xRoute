import {Controller} from 'jsLib/controller';
import modelA from './a-model';
import {util, elementSet} from 'jsLib/util';
import timeSelectComponent from '../../components/time-select/index';
import cityComponent from '../../components/city-select/index';
import {canvasResize} from 'jsLib/imgResize';
import dd from 'jsLib/dialog';

let controller = modelA.registerController('#container');

controller
	.getDomMap({
		aContainer: '.a-container',
		myName: '.myName',
		myPhone: '.myPhone'
	})
	.getBindEvents({
		aContainer: {
			actionName: 'click',
			action() {
				elementSet.css(this, { color: 'red' });
			}
		},
		myName: {
			actionName: 'input',
			action(e) {
				console.log(this.value);
			}
		},
		myPhone: {
			actionName: 'input',
			action(e) {
				console.log(this.value);
			}
		}
	})
	//页面状态初始化.从localstorage中获取
	.getViewInit(function () {
		let doms = this.domMap;
		doms.myName.value = modelA.submitData.name;

		let timeSelect = new timeSelectComponent();

		var nameEl = document.getElementById('name');

		timeSelect.configModule({
			startYearArr: [1972],
			containerArr: ['#name', '#name-test'],
			callbackArr: [function (time) {
				console.log(time);
			}]
		});
		//timeSelect.initTimeModule();
		timeSelect.initAlphaModule();

		let json = require('../../components/city-select/city-json'),
			_cityComponent = new cityComponent();



		_cityComponent.configModule({
			allCities: json.data,
			succCb(data) {
				console.log(data);
			},
			failCb() {
				console.log('请选择城市');
			}
		});


		let cityWrapper = document.querySelector('.city-wrapper'),
			clickBtn = document.querySelector('.btn'),
			dialogBtn = document.querySelector('.alert-btn');

		let dialog = dd.dialog || {};

		_cityComponent.initModule(cityWrapper);

		//城市组件
		clickBtn.addEventListener('click', function () {
			util.addClass(cityWrapper, 'city-box-show');
		});

		//弹窗组件
		dialogBtn.addEventListener('click', function() {
			dialog.alert('It\'s a good job');
		});

		let imgContainer = document.getElementById('file');
		imgContainer.addEventListener('change', function (e) {
			let file = this.files[0];
			if (!file) return;

			//图片压缩
			canvasResize(file, {
				crop: false,
				quality: 0.1,
				rotate: 0,
				callback(baseStr) {
					let img = new Image();
					img.src = baseStr;
					document.body.appendChild(img);
				}
			})
		});
	})
	.getViewDestory(function() {
		//console.log('PageA is leaving now');
		//console.log(modelA.submitData);
		let pickerEl = document.querySelector('.picker');
		document.body.removeChild(pickerEl);
	});

export {
controller
}