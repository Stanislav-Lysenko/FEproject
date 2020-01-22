class Signin{
	constructor(users){
		this.storage = new Storage();
		this.users = users;
		this.emailRegExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
		this.passRegExp = /^\w{6,}$/;
		this.init();
	}

	async init(){
		await this.storage.init();
		this.findNodes();
		this.bindAll();
		this.addEvents();

	}

	findNodes(){
		this.nodes = {
			form: document.forms.signin,
			email: document.forms.signin.elements.email,
			pass: document.forms.signin.elements.pass,
			submit: document.forms.signin.elements.submit,
			warning: document.getElementsByClassName('signin__warning')[0]
		}
	}

	addEvents() {
		this.nodes.submit.addEventListener('click', this.submitForm)
	}

	bindAll() {
		this.submitForm = this.submitForm.bind(this);
	}

	submitForm(e){
		e.preventDefault();
		let flag = true;
		this.nodes.warning.innerHTML = '';
		//check valid email
		if (!this.emailRegExp.test(this.nodes.email.value)) {
			this.createWarningMessage('email');
			flag = false;
		} //check valid passward
		if (!this.passRegExp.test(this.nodes.pass.value)) {
			this.createWarningMessage('password');
			flag = false;
		}
		if (flag){
			this.findUser(this.nodes.email.value, this.nodes.pass.value)
		} else {
			return;
		}
	}

	findUser(login, pass){
		let user = this.users.find(user => user.login === login && user.password === pass );
		if (!user) {
			this.createWarningMessage('unknownuser');
		} else {
			this.successLogin(user);
			//console.dir(this.storage.getLoginedUserFromLocalStorage());
			location.assign('/');
		}
	}

	// add user logined user to LocalStorage
	successLogin(user) {
		this.storage.addLoginedUsertoLocalStorage(user);
	}

	createWarningMessage(errorname){
		let message = document.createElement('p');
		switch (errorname){
			case 'email':
				message.append(document.createTextNode('You entered incorrect email'));
			break;
			case 'password':
				message.append(document.createTextNode('You entered incorrect pass: 6 lettes or numers or _'));
			break;
			case 'unknownuser':
				message.append(document.createTextNode('Unknown user'));
			break;
			default: console.log('incorrect error name');
		}
		this.nodes.warning.appendChild(message);
	}
 }