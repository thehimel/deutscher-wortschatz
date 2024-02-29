# germanwords-backend

Backend for German Words

## Run Production Server Locally

```sh
SECRET_KEY='GET_DATA'
DEBUG='False'
ENVIRONMENT='PROD'
DATABASE_URL="GET_DATA"
```

* Command: `python src/manage.py runserver 8080`

## Workflow:

* Stuff member adds the data.
* Admin will have to approve the data.
* Only approved data will be listed in list view.

## Resources

* [crispy-bootstrap5](https://github.com/django-crispy-forms/crispy-bootstrap5)
* [font-awesome-6.5.1](https://use.fontawesome.com/releases/v6.5.1/fontawesome-free-6.5.1-web.zip)
  * [Python/Django Installation Guideline](https://fontawesome.com/docs/web/use-with/python-django)

## Allauth Pages Updated

* `accounts/*.html`
