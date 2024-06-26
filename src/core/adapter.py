from allauth.account.adapter import DefaultAccountAdapter
from django.forms import ValidationError

from core.constants import USERNAME_MAX_LENGTH


class UsernameMaxAdapter(DefaultAccountAdapter):
    """To enforce username max length. Added ACCOUNT_ADAPTER in settings."""

    def clean_username(self, username: str, shallow=False):
        if len(username) > USERNAME_MAX_LENGTH:
            raise ValidationError(f"Please enter a username less than {USERNAME_MAX_LENGTH + 1}")

        # For other default validations.
        return DefaultAccountAdapter.clean_username(self, username=username, shallow=shallow)
