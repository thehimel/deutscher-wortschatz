from django.db.models.signals import pre_delete
from django.dispatch import receiver

from apps.previews.models import Preview


@receiver(pre_delete, sender=Preview)
def delete_related_pre_words(sender, instance, **kwargs):
    """
    Signal receiver to delete related PreWord instances when a Preview instance is deleted.
    Note: Though sender and **kwargs are unused, they are needed for successful execution.
    """
    for word in instance.words.all():
        word.delete()
