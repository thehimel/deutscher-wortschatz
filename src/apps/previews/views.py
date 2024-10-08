from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.api.utils import serializer_to_manual_parameters
from apps.previews.models import Preview
from apps.previews.serializers import PreviewListSerializer, PreviewUpdateSerializer, PreWordSerializer, \
    PreviewListQueryParamsSerializer
from apps.words.views import BaseWordListAPIView


class PreviewListAPIView(BaseWordListAPIView):
    model = Preview
    serializer_class = PreviewListSerializer
    query_params_serializer_class = PreviewListQueryParamsSerializer

    @swagger_auto_schema(manual_parameters=serializer_to_manual_parameters(query_params_serializer_class))
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class PreWordCreateView(APIView):
    @swagger_auto_schema(request_body=PreWordSerializer)
    def post(self, request, *args, **kwargs):
        serializer = PreWordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PreviewCreateOrUpdateAPIView(APIView):
    @swagger_auto_schema(request_body=PreviewUpdateSerializer)
    def post(self, request):
        serializer = PreviewUpdateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(request_body=PreviewUpdateSerializer)
    def put(self, request, pk):
        try:
            preview = Preview.objects.get(pk=pk)
        except Preview.DoesNotExist:
            return Response({"message": "Preview not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = PreviewUpdateSerializer(preview, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
